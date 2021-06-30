export interface User {
    avatar_url: string;
    bio: string;
    name: string;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
    login: string;
}

export interface Repos {
    name: string;
    repos_url: string;
    html_url: string;
}