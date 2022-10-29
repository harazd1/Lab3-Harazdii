export class CreateCommentDto {
    constructor(
        readonly postId: number, 
        readonly username: string, 
        readonly comment: string
        ) {}
}