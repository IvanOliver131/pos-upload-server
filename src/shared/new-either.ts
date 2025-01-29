export type Failure<T> = {
  readonly error: T
  readonly success?: never
}

export type Success<U> = {
  readonly error?: never
  readonly success: U
}

export type Result<T, U> = NonNullable<Failure<T> | Success<U>>

export const isFailure = <T, U>(result: Result<T, U>): result is Failure<T> => {
  return result.error !== undefined
}

export const isSuccess = <T, U>(result: Result<T, U>): result is Success<U> => {
  return result.success !== undefined
}

export type UnwrapResult = <T, U>(result: Result<T, U>) => NonNullable<T | U>

export const unwrapResult: UnwrapResult = <T, U>(result: Result<T, U>) => {
  if (isFailure(result)) {
    return result.error as NonNullable<T>
  }
  if (isSuccess(result)) {
    return result.success as NonNullable<U>
  }
  throw new Error(
    'Received no error or success values at runtime when unwrapping Result'
  )
}

export const fail = <T>(error: T): Failure<T> => {
  if (error === undefined || error === null) {
    throw new Error('Error value cannot be undefined or null')
  }
  return { error }
}

export const succeed = <U>(success: U): Success<U> => {
  if (success === undefined || success === null) {
    throw new Error('Success value cannot be undefined or null')
  }
  return { success }
}
