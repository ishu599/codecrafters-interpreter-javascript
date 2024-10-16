
import {readFileSync} from 'fs'
export let name = 'tokenize'
export let description = 'tokenize'
const supportedChars = {
    "(": "LEFT_PAREN",
    ")": "RIGHT_PAREN",
    "{": "LEFT_BRACE",
    "}": "RIGHT_BRACE",
    "*": "STAR",
    ".": "DOT",
    ",": "COMMA",
    "+": "PLUS",
    "-": "MINUS",
    ";": "SEMICOLON",
    "=": "EQUAL",
    "==": "EQUAL_EQUAL",
    "!=": "BANG_EQUAL",
    "!": "BANG",
    "<": "LESS",
    "<=": "LESS_EQUAL",
    ">": "GREATER",
    ">=": "GREATER_EQUAL",
    "/": "SLASH",
}
const ignoredChars = [
    " ",
    "\t"
]
export function execute(filename) {
    const fileContent = readFileSync(filename, "utf8");
    const lines = fileContent.split('\n')
    let hasError = false;
    for (let line in lines) {
        const chars = lines[line].split('');
        for (let i = 0 ; i < chars.length ; i++) {
            let currentChar = chars[i];
            let nextChar = chars[Number.parseInt(i) + 1]
            if ("\"" === currentChar) {
                let content = ""
                i++
                currentChar = chars[i]
                while (i < chars.length && currentChar !== "\"") {
                    currentChar = chars[i]
                    if (currentChar === "\"") {
                        break
                    }
                    content += currentChar
                    i++
                }
                if (currentChar !== "\"") {
                    console.error(`[line ${Number.parseInt(line) + 1}] Error: Unterminated string.`)
                    hasError = true
                    continue
                }
                console.log(`STRING "${content}" ${content}`)
                continue
            }
            if (currentChar + nextChar === "//") {
                i++
                break
            }
            if (ignoredChars.includes(currentChar)) {
                continue
            } else if (ignoredChars.includes(currentChar + nextChar)) {
                i++
                continue
            }
            if (supportedChars[chars[i]]) {
                if (supportedChars[currentChar + nextChar]) {
                    currentChar = currentChar + nextChar
                    i++
                }
                console.log(`${supportedChars[currentChar]} ${currentChar} null`)
                continue
            }
            if (Number.parseInt(currentChar) >= 0 && Number.parseInt(currentChar) <= 9) {
                let content = ""
                while (i < chars.length && Number.parseInt(currentChar) >= 0 && Number.parseInt(currentChar) <= 9 || currentChar === ".") {
                    content += currentChar
                    i++
                    currentChar = chars[i]
                }
                // On affiche le nombre sous le format NUMBER 42 42.0
                let realDisplay = content.includes(".") ? content : content + ".0"
                let split = realDisplay.split(".")
                if (Number.parseInt(split[1]) === 0) {
                    realDisplay = split[0] + ".0"
                }
                console.log(`NUMBER ${content} ${realDisplay}`)
                i--
                continue
            }
                console.error(`[line ${Number.parseInt(line) + 1}] Error: Unexpected character: ${chars[i]}`)
                hasError = true
            // Handle Identifier : [a-zA-Z] et _
            if (currentChar.match(/[a-zA-Z_]/)) {
                let content = ""
                while (i < chars.length && chars[i].match(/[a-zA-Z0-9_]/)) {
                    content += chars[i]
                    i++
                }
                console.log(`IDENTIFIER ${content} null`)
                i--
                continue
            }
            console.error(`[line ${Number.parseInt(line) + 1}] Error: Unexpected character: ${chars[i]}`)
            hasError = true
        }
    }
    console.log("EOF  null");
    if (hasError) {
        process.exit(65)
    }
}
// No newline at end of file