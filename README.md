# Informe práctica 5

## Respuestas preguntas del punto 1

### 1.1 Escriba la derivación para cada una de las frases. 

> Para **4.0-2.0*3.0**:

L => E eof => E op T eof => (E op T) op T eof => (T op T) op T eof => (number op T) op T eof => (4.0 - T) op T eof =>
  (4.0 - number) op T eof => (4.0 - 2.0) * T eof => (4.0 - 2.0) * number eof => 4.0 - 2.0 * 3.0 eof

> Para **2\*\*3\*\*2**:

L => E eof => E op T eof => (E op T) op T eof => (T op T) op T eof => (number op T) op T eof => (2 op T) op T eof => (2 ** T) op T eof 
  => (2 ** number) op T eof => (2 ** 3) op T eof => (2 ** 3) ** T eof => (2 ** 3) ** number eof => 2 ** 3 ** 2 eof

> Para **7-4/2**:

L => E eof => E op T eof => (E op T) op T eof => (T op T) op T eof => (number op T) op T eof => (7 op T) op T eof => 
  (7 - T) op T eof => (7 - number) op T eof => (7 - 4) op T eof => (7 - 4) / T eof => (7 - 4) / number eof => 7 - 4 / 2 eof


### 1.2 Escriba el árbol de análisis sintáctico (parse tree) para cada una de las frases.

> Para **4.0-2.0*3.0**:

```text
L
├── E
│   ├── E
│   │   ├── E
│   │   │   └── T
│   │   │       └── number("4.0")
│   │   ├── op("-")
│   │   └── T
│   │       └── number("2.0")
│   ├── op("*")
│   └── T
│       └── number("3.0")
└── eof
```

> Para **2\*\*3\*\*2**:

```text
L
├── E
│   ├── E
│   │   ├── E
│   │   │   └── T
│   │   │       └── number("2")
│   │   ├── op("**")
│   │   └── T
│   │       └── number("3")
│   ├── op("**")
│   └── T
│       └── number("2")
└── eof
```

> Para **7-4/2**:

```text
L
├── E
│   ├── E
│   │   ├── E
│   │   │   └── T
│   │   │       └── number("7")
│   │   ├── op("-")
│   │   └── T
│   │       └── number("4")
│   ├── op("/")
│   └── T
│       └── number("2")
└── eof
```

### 1.3 ¿En qué orden se evaluan las acciones semánticas para cada una de las frases? Nótese que la evaluación a la que da lugar la sdd para las frases no se corresponde con  los convenios de evaluación establecidos en matemáticas y los lenguajes de programación.

Es importante notar que para una SDD (Definición dirigida por sintaxis) el orden de evaluación de las acciones semánticas viene determinado por el recorrido en post-orden del árbol de análisis sintáctico. En esta SDD, los variables se sintetizan hacia arriba, una regla no puede ejecutarse hasta que todos los nodos hijos que influyen en dicha acción hayan sido calculados.

> Para **4.0-2.0*3.0**:

1. convert("4.0")
2. convert("2.0")
3. operate("-", 4.0, 2.0)
4. convert("3.0")
5. operate("\*", 2.0, 3.0) *Nótese que el 2.0 es el resultado del operate anterior*

> Para **2\*\*3\*\*2**:

1. convert("2")
2. convert("3")
3. operate("**", 2, 3)
4. convert("2")
5. operate("\*\*", 8, 2) *Nótese que el 8 es el resultado del operate anterior*

> Para **7-4/2**:

1. convert("7")
2. convert("4")
3. operate("-", 7, 4)
4. convert("2")
5. operate("/", 3, 2) *Nótese que el 3 es el resultado del operate anterior*



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
