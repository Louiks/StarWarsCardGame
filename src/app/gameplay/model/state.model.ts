export interface LoadingState {
  loading: boolean;
  loaded: boolean;
}

export const initialLoadingState: LoadingState = {
  loading: false,
  loaded: false,
}

export const loadedState: LoadingState = {
  loading: false,
  loaded: true,
}

export const loadingState: LoadingState = {
  loading: true,
  loaded: false,
}
