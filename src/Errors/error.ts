export default interface IError extends Error {
    httpStausCode?: number
}