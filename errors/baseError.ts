export abstract class BaseError extends Error {
    code!: number;
    error!: string
}