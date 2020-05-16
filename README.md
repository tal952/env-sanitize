# env-sanitize 🧹

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM version](https://img.shields.io/npm/v/env-sanitize.svg)](https://www.npmjs.com/package/env-sanitize)  
Sanitization and verification of environment variables with typescript support.

## Installation

### npm

```
npm install env-sanitize
```

### yarn

```
yarn add env-sanitize
```

## Example

```javascript
import env from "env-sanitize";
// or const env = require('env-sanitize');

// If not exists, throw.
const env_region = env("AWS_REGION");

// use default if not exists.
const env_server_url = env("SERVER_URL", "localhost");

// get MAX_CONNECTIONS env, and transform it to int.
// throw if its not a number or not exists.
const env_max_connections = env("MAX_CONNECTIONS", (x) => x.asInt());

// get PORT env, and transform it to number in port range.
// throw if its out of the range.
// return default if not exists.
const env_port = env("PORT", (x) => x.asPort(), 4000);

// We can chain the Sanitizers.
const env_key = env("STRING_KEY", (x) =>
  x
    .asLowerCase()
    .asEnum(["one", "two"])
    .transform((v) => (v === "one" ? 1 : 2))
);
```

## Sanitizers

- [required](#required)
- [with default](#with-default)
- [asInt](#asint)
- [asFloat](#asfloat)
- [greater](#greater)
- [greaterOrEqual](#greaterorequal)
- [less](#less)
- [lessOrEqual](#lessorequal)
- [asBoolean](#asboolean)
- [asEnum](#asenum)
- [asRegex](#asregex)
- [asPort](#asport)
- [asJson](#asjson)
- [asJsonArray](#asjsonarray)
- [asLowerCase](#aslowercase)
- [asUpperCase](#asuppercase)
- [assert](#assert)
- [transform](#transform)

### required

```javascript
const env_required = env("REQUIRED_KEY");
```

### with default

```javascript
const env_key = env("OPTIONAL_KEY", "default");
```

### asInt

```javascript
const env_key = env("INT_KEY", (x) => x.asInt());
```

### asFloat

```javascript
const env_key = env("FLOAT_KEY", (x) => x.asFloat());
```

### greater

```javascript
const env_float_key = env("FLOAT_KEY", (x) => x.greater(1));
const env_int_key = env("INT_KEY", (x) => x.asInt().greater(1));
```

### greaterOrEqual

```javascript
const env_float_key = env("FLOAT_KEY", (x) => x.greaterOrEqual(1));
const env_int_key = env("INT_KEY", (x) => x.asInt().greaterOrEqual(1));
```

### less

```javascript
const env_float_key = env("FLOAT_KEY", (x) => x.less(9));
const env_int_key = env("INT_KEY", (x) => x.asInt().less(9));
```

### lessOrEqual

```javascript
const env_float_key = env("FLOAT_KEY", (x) => x.lessOrEqual(9));
const env_int_key = env("INT_KEY", (x) => x.asInt().lessOrEqual(9));
```

### asBoolean

```javascript
const env_key = env("BOOLEAN_KEY", (x) => x.asBoolean());
```

### asEnum

```javascript
const env_key = env("ENUM_KEY", (x) => x.asEnum(["option1", "option2"]));
```

### asRegex

```javascript
const env_key = env("ONLY_NUMBERS_KEY", (x) => x.asRegex(/^[0-9]*$/g));
```

### asPort

```javascript
const env_key = env("INT_KEY", (x) => x.asPort());
```

### asJson

```javascript
const env_key = env("JSON_KEY", (x) => x.asJson());
```

### asJsonArray

```javascript
const env_key = env("JSON_ARRAY_KEY", (x) => x.asJsonArray());
```

### asLowerCase

```javascript
const env_key = env("STRING_KEY", (x) => x.asLowerCase());
```

### asUpperCase

```javascript
const env_key = env("STRING_KEY", (x) => x.asUpperCase());
```

### assert

```javascript
const env_key = env("STRING_KEY", (x) =>
  x.assert(
    (v) => v === "foo",
    (v) => `${v} is not foo.` // The message to throw.
  )
);
```

### transform

```javascript
const env_key = env("STRING_KEY", (x) => x.transform((v) => v.toString().toLowerCase()););
```
