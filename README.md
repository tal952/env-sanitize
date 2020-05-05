Sanitization and verification of environment variables with typescript support.

# Install

### npm

```
npm install env-sanitize
```

### yarn

```
yarn add env-sanitize
```

# Example

```javascript
import env from "env-sanitize";
// or const env = require('env-sanitize');

const env_region = env("AWS_REGION"); // If not exists, throw.
const env_server_url = env("SERVER_URL", "localhost"); // use default if not exists.
const env_max_connections = env("MAX_CONNECTIONS", (x) => x.asInt()); // get MAX_CONNECTIONS env, and transform it to int. throw if its not a number or not exists.
const env_port = env("PORT", (x) => x.asPort(), 4000); // get PORT env, and transform it to number in port range. throw if its out of the range. return default if not exists.

const env_key = env("STRING_KEY", (x) =>
  x
    .asLowerCase()
    .asEnum(["one", "two"])
    .transform((v) => (v === "one" ? 1 : 2))
); // We can chain the Sanitizers.
```

# Sanitizers

## required

```javascript
const env_required = env("REQUIRED_KEY");
```

## with default

```javascript
const env_key = env("OPTIONAL_KEY", "default");
```

## asInt

```javascript
const env_key = env("INT_KEY", (x) => x.asInt());
```

## asIntInclusiveBetween

```javascript
const env_key = env("INT_KEY", (x) => x.asIntInclusiveBetween(1, 5));
```

## asFloat

```javascript
const env_key = env("FLOAT_KEY", (x) => x.asFloat());
```

## asFloatInclusiveBetween

```javascript
const env_key = env("FLOAT_KEY", (x) => x.asFloatInclusiveBetween(1.4, 9.8));
```

## asBoolean

```javascript
const env_key = env("BOOLEAN_KEY", (x) => x.asBoolean());
```

## asEnum

```javascript
const env_key = env("ENUM_KEY", (x) => x.asEnum(["option1", "option2"]));
```

## asPort

```javascript
const env_key = env("INT_KEY", (x) => x.asPort());
```

## asJson

```javascript
const env_key = env("JSON_KEY", (x) => x.asJson());
```

## adJsonArray

```javascript
const env_key = env("JSON_ARRAY_KEY", (x) => x.asJsonArray());
```

## asJsonArray

```javascript
const env_key = env("JSON_ARRAY_KEY", (x) => x.asJsonArray());
```

## asLowerCase

```javascript
const env_key = env("STRING_KEY", (x) => x.asLowerCase());
```

## asUpperCase

```javascript
const env_key = env("STRING_KEY", (x) => x.asUpperCase());
```

## assert

```javascript
const env_key = env("STRING_KEY", (x) =>
  x.assert(
    (v) => v === "foo",
    (v) => `${v} is not foo.` // The message to throw.
  )
);
```

## transform

```javascript
const env_key = env("STRING_KEY", (x) => x.transform((v) => v.toString().toLowerCase()););
```