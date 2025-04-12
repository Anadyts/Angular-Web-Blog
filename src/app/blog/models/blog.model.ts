export interface User{
    user_id: number,
    username: string
}

export interface Article{
    article_id: number,
    author_id: number,
    content: string,
    title: string,
    created_at: string, 
}