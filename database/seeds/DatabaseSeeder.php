<?php

use App\User;
use App\Model\Like;
use App\Model\Reply;
use App\Model\Category;
use App\Model\Question;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory(User::class,10)->create();
        factory(Category::class, 5)->create();
        factory(Question::class, 10)->create();
        factory(Reply::class, 40)->create()->each(function($reply){

            return $reply->like()->save(factory(Like::class)->make());

        });
    }
}
