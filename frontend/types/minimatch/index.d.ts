declare module "minimatch" {
  export interface IOptions {
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    dot?: boolean;
    noext?: boolean;
    nocase?: boolean;
    matchBase?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
  }

  export function Minimatch(pattern: string, options?: IOptions): any;
  export function filter(pattern: string, options?: IOptions): (path: string) => boolean;
  export function match(list: string[], pattern: string, options?: IOptions): string[];
  export function makeRe(pattern: string, options?: IOptions): RegExp | null;
  export function braceExpand(pattern: string, options?: IOptions): string[];
  export function escape(pattern: string): string;

  export interface IMinimatch {
    pattern: string;
    options: IOptions;
    negate: boolean;
    comment: boolean;
    empty: boolean;
    set: RegExp[][];
    regexp: RegExp;
    makeRe(): RegExp;
    match(fname: string): boolean;
  }

  export const minimatch: typeof match;
  export default minimatch;
}

