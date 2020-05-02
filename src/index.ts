import Context from "./Context";

function env(key: string): string;
function env<R>(
  key: string,
  sanitizer: (context: Context<string>) => Context<R>,
  defaultValue?: R | (() => R)
): R;
function env<R>(key: string, defaultValue: R | (() => R)): R;
function env(key: string, sanitizer?, defaultValue?) {
  const initialValue = process.env[key];

  if (
    defaultValue == undefined &&
    !(sanitizer instanceof Function && sanitizer.length === 1)
  ) {
    defaultValue = sanitizer;
    sanitizer = undefined;
  }

  if (initialValue == undefined) {
    if (defaultValue == undefined)
      throw new Error(`Key: ${key} does not exists.`);

    return defaultValue instanceof Function ? defaultValue() : defaultValue;
  }

  if (!sanitizer) return initialValue;

  const result = sanitizer(new Context(key, initialValue));

  return result.value;
}

export default env;
