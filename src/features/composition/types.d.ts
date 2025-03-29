export interface CompositionState {
    composition: Composition;
    compositionsList: Composition[];
    errorMessage?: string;
    status?: 'idle' | 'loading' | 'success' | 'error';
}

export interface NewComposition {
  name: string
  book: string
  number: string
  theme: string
}

export interface Composition {
  id: string
  name: string
  book: string
  number: string
  theme: string
  lastData: string
  inWork: string
  lastDirigent: string
}

export interface AddCompositionInWorkDto {
  id: string
  lastDirigent: string
}
