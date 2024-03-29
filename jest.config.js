module.exports = {
    collectCoverage: true,
    coverageReporters: [
        "text",
        "cobertura",
    ],
    coverageThreshold: {
        global: {
            lines: 90
        }
    },
    transform: {"^.+\\.ts?$": "ts-jest"},
    testEnvironment: "node",
    testRegex: "/src/test/.*\\.(test|spec)?\\.(ts|tsx)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
