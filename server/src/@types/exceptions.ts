export interface HttpErrorException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
    status: number;
    message: string;
}
