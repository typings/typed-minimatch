/**
 * Tests a path against the pattern using the options.
 */
declare function minimatch (target: string, pattern: string, options?: minimatch.Options): boolean;

declare namespace minimatch {
  /**
   * Returns a function that tests its supplied argument, suitable for use with `Array.filter`.
   */
  export function filter (pattern: string, options?: Options): (element: string, indexed: number, array: string[]) => boolean;

  /**
   * Match against the list of files, in the style of fnmatch or glob. If nothing is matched, and options.nonull is set, then return a list containing the pattern itself.
   */
  export function match (list: string[], pattern: string, options?: Options): string[];

  /**
   * Make a regular expression object from the pattern.
   */
  export function makeRe (pattern: string, options?: Options): RegExp;

  /**
   * All options are `false` by default.
   */
  export interface Options {
    /**
     * Dump a ton of stuff to stderr.
     */
    debug?: boolean;
    /**
     * Do not expand `{a,b}` and `{1..3}` brace sets.
     */
    nobrace?: boolean;
    /**
     * Disable `**` matching against multiple folder names.
     */
    noglobstar?: boolean;
    /**
     * Allow patterns to match filenames starting with a period, even if the pattern does not explicitly have a period in that spot.
     *
     * Note that by default, `a\/**\/b` will not match `a/.d/b`, unless `dot` is set.
     */
    dot?: boolean;
    /**
     * Disable "extglob" style patterns like `+(a|b)`.
     */
    noext?: boolean;
    /**
     * Perform a case-insensitive match.
     */
    nocase?: boolean;
    /**
     * When a match is not found by `minimatch.match`, return a list containing the pattern itself if this option is set. When not set, an empty list is returned if there are no matches.
     */
    nonull?: boolean;
    /**
     * If set, then patterns without slashes will be matched against the basename of the path if it contains slashes. For example, `a?b` would match the path `/xyz/123/acb`, but not `/xyz/acb/123`.
     */
    matchBase?: boolean;
    /**
     * Suppress the behavior of treating `#` at the start of a pattern as a comment.
     */
    nocomment?: boolean;
    /**
     * Suppress the behavior of treating a leading `!` character as negation.
     */
    nonegate?: boolean;
    /**
     * Returns from negate expressions the same as if they were not negated. (Ie, true on a hit, false on a miss.)
     */
    flipNegate?: boolean;
  }

  export class Minimatch {
    constructor (pattern: string, options?: Options);

    /**
     * The original pattern the minimatch object represents.
     */
    pattern: string;
    /**
     * The options supplied to the constructor.
     */
    options: Options;
    /**
     * A 2-dimensional array of regexp or string expressions. Each row in the array corresponds to a brace-expanded pattern. Each item in the row corresponds to a single path-part. For example, the pattern `{a,b/c}/d` would expand to a set of patterns like:
     *
     * ```
     * [ [ a, d ]
     * , [ b, c, d ] ]
     * ```
     */
    set: (string | RegExp)[][];
    /**
     * Created by the `makeRe` method. A single regular expression expressing the entire pattern. This is useful in cases where you wish to use the pattern somewhat like `fnmatch(3)` with `FNM_PATH` enabled.
     */
    regexp: RegExp;
    /**
     * True if the pattern is negated.
     */
    negate: boolean;
    /**
     * True if the pattern is a comment.
     */
    comment: boolean;
    /**
     * True if the pattern is `""`.
     */
    empty: boolean;

    /**
     * Generate the regexp member if necessary, and return it. Will return false if the pattern is invalid.
     */
    makeRe (): RegExp | boolean;
    /**
     * Return true if the filename matches the pattern, or false otherwise.
     */
    match (fname: string): boolean;
    /**
     * Take a `/`-split filename, and match it against a single row in the `regExpSet`. This method is mainly for internal use, but is exposed so that it can be used by a glob-walker that needs to avoid excessive filesystem calls.
     */
    matchOne (fileArray: string[], patternArray: string[], partial: boolean): boolean;
  }
}

export = minimatch;
