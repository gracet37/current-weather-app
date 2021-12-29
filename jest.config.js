module.exports = {
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.(d.ts|ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx|mjs)$': 'babel-jest'
    },
    moduleDirectories: ['node_modules', 'utils', 'src'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    testPathIgnorePatterns: ['/node_modules/'],
    transformIgnorePatterns: ['/node_modules/'],
    coveragePathIgnorePatterns: ['/node_modules/']
};
