// comment.model.ts
export interface BlogComment {
    comment_id: number;
    article_id: number;
    user_id: number;
    content: string;
    created_at: string;
    username: string;
}

export interface Like{
    like_id: number,
    article_id: number,
    user_id: number,
    created_at: string
}
