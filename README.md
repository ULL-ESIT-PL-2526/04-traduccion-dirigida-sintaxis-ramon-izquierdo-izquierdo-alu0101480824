# Informe Práctica 4

## Respuestas al punto 3 (lexer)

### 3.1 Diferencia entre `/* skip whitespace */` y devolver un token

- `/* skip whitespace */` consume espacios en blanco (`\s+`) y **no devuelve ningún token** al parser.
- Devolver un token (por ejemplo, `NUMBER` u `OP`) significa que el lexer entrega una unidad léxica al parser para que participe en el análisis sintáctico.

### 3.2 Secuencia de tokens para la entrada `123**45+@`

La secuencia exacta producida por el lexer es:

1. `NUMBER` con lexema `123`
2. `OP` con lexema `**`
3. `NUMBER` con lexema `45`
4. `OP` con lexema `+`
5. `INVALID` con lexema `@`
6. `EOF`

### 3.3 Por qué `**` debe aparecer antes que `[-+*/]`

- `**` es un operador de dos caracteres, mientras que `[-+*/]` reconoce operadores de un carácter (incluido `*`).
- Si la regla de `[-+*/]` se aplica antes en un lexer basado en prioridad por orden de reglas, la cadena `**` podría separarse como dos `*` en lugar de un único operador de potencia.
- Colocar primero la regla más específica evita esa ambigüedad y garantiza el token correcto para potencia.

### 3.4 Cuándo se devuelve `EOF`

- `EOF` se devuelve cuando el lexer alcanza el final de la entrada (`<<EOF>>`), es decir, cuando ya no quedan caracteres por leer.

### 3.5 Por qué existe la regla `.` que devuelve `INVALID`

- La regla `.` actúa como captura de cualquier carácter no reconocido por las reglas anteriores.
- Devolver `INVALID` permite detectar y reportar errores léxicos explícitos (por ejemplo, `@`) en lugar de ignorarlos silenciosamente.´


# Syntax Directed Translation with Jison

Jison is a tool that receives as input a Syntax Directed Translation and produces as output a JavaScript parser  that executes
the semantic actions in a bottom up ortraversing of the parse tree.
 

## Compile the grammar to a parser

See file [grammar.jison](./src/grammar.jison) for the grammar specification. To compile it to a parser, run the following command in the terminal:
``` 
➜  jison git:(main) ✗ npx jison grammar.jison -o parser.js
```

## Use the parser

After compiling the grammar to a parser, you can use it in your JavaScript code. For example, you can run the following code in a Node.js environment:

```
➜  jison git:(main) ✗ node                                
Welcome to Node.js v25.6.0.
Type ".help" for more information.
> p = require("./parser.js")
{
  parser: { yy: {} },
  Parser: [Function: Parser],
  parse: [Function (anonymous)],
  main: [Function: commonjsMain]
}
> p.parse("2*3")
6
```
