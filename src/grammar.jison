/* Lexer */
%lex
%%
\s+                   { /* skip whitespace */; }
\/\/[^\n]*            { /* skip line comment */; }
[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?   { return 'NUMBER'; }
"!"                   { return '!'; }
"**"                  { return 'OPPOW';           }
[*/]                  { return 'OPMUL'; }
[-+]                  { return 'OPAD';           }
"("                   { return '('; }
")"                   { return ')'; }
<<EOF>>               { return 'EOF';          }
.                     { return 'INVALID';      }
/lex

/* Parser */
%start expressions
%token NUMBER
%%

expressions
    : expression EOF
        { return $expression; }
    ;

expression
    : expression OPAD term
        { $$ = operate($OPAD, $expression, $term); }
    | term
        { $$ = $term; }
    ;

term 
    : term OPMUL registro
        { $$ = operate($OPMUL, $term, $registro); }
    | registro
        { $$ = $registro; }
    ;

registro 
    : final OPPOW registro
        { $$ = operate($OPPOW, $final, $registro); }
    | final 
        { $$ = $final; }
    ;

final
    : final '!'
        { $$ = factorial($final); }
    | NUMBER
        { $$ = Number(yytext); }
    | '(' expression ')'
        { $$ = $expression; }   
    ;
%%

function operate(op, left, right) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        case '**': return Math.pow(left, right);
    }
}

function factorial(n) {
    if (n <= 0) return NaN;
    if (n === 1) return 1;
    return n * factorial(n - 1);
}