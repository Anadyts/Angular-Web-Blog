// comment.model.ts
export interface BlogComment {
    comment_id: number;
    article_id: number;
    user_id: number;
    content: string;
    created_at: string;
    username: string;
}
