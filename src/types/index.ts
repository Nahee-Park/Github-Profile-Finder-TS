export interface User {
    avatar_url: string;
    bio: string;
    name: string;
    followers: number;
    followings: number;
    public_repos: number;
}

export interface Repos {
    name: string;
    repos_url: string;
}