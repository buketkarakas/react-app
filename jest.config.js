/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "test/(.*)": "<rootDir>/test/$1",
        '^axios$': require.resolve('axios'),
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,ts}"]
};