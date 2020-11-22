<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{

    use Notifiable, HasApiTokens;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function expenses()
    {
        return $this->hasMany(Expenses::class)->latest();
    }

    public function Filter($catFilter, $startDateFilter, $endDateFilter, $rangeFilter, $expenseFilter, $sort)
    {
        $expen = $this->hasMany(Expenses::class)->with(['categories']);
        if ($catFilter[0]) {
            $expen = $expen->where('categories_id', '=', $catFilter[1]);
        }
        if ($startDateFilter[0]) {
            $expen = $expen->where('created_at', '>', $startDateFilter[1]);
        }
        if ($endDateFilter[0]) {
            $expen = $expen->where('created_at', '<', $endDateFilter[1]);
        }
        if ($rangeFilter[0]) {
            $expen = $expen->where('amount', '>', $catFilter[1][0])->where('amount', '<', $catFilter[1][1]);
        }
        if ($expenseFilter[0]) {
            $expen = $expen->where('expenseType', '=', $expenseFilter[1]);
        }
        if ($sort[0]) {
            $expen = $expen->orderBy($sort[1], $sort[2]);
        }
        return $expen->paginate(5);
    }

    public function withCategories()
    {
        return $this->hasMany(Expenses::class)->latest()->with(['categories'])->paginate(5);
    }

    public function withCategoriesAndSort($column, $type)
    {
        return $this->hasMany(Expenses::class)->with(['categories'])->orderBy($column, $type)->paginate(5);
    }

}
