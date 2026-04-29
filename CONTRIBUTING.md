# Contributing to Task Management System

Thank you for considering contributing to the Task Management System. This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome. Please provide:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant examples or mockups

### Pull Requests

1. Fork the repository
2. Create a new branch from main
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes following our coding standards
4. Write or update tests if applicable
5. Update documentation if needed
6. Commit your changes with clear messages
```bash
git commit -m "Add feature: description of feature"
```

7. Push to your fork
```bash
git push origin feature/your-feature-name
```

8. Create a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Test results

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/Mishra-coder/SeSD-Project.git
cd SeSD-Project
```

2. Run setup script
```bash
./setup.sh
```

3. Create PostgreSQL database
```bash
createdb taskmanagement
```

4. Configure environment variables
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

5. Start development servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm start
```

## Coding Standards

### JavaScript/React
- Use ES6+ syntax
- Follow functional component patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use PropTypes or TypeScript for type checking

### Code Formatting
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Maximum line length of 100 characters
- Add trailing commas in objects and arrays

### Git Commit Messages
Follow conventional commit format:
```
type(scope): subject

body

footer
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks

Examples:
```
feat(tasks): add task filtering by priority
fix(auth): resolve token expiration issue
docs(readme): update installation instructions
```

### File Organization
- Place components in src/components/
- Place services in src/services/
- Place utilities in src/utils/
- Place constants in src/constants/
- Place hooks in src/hooks/

### Backend Standards
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate input data
- Use middleware for common functionality
- Follow RESTful API conventions
- Document API endpoints

## Testing

### Running Tests
```bash
# Frontend tests
npm test

# Backend tests
cd backend
npm test
```

### Writing Tests
- Write unit tests for utilities and services
- Write integration tests for API endpoints
- Write component tests for React components
- Aim for meaningful test coverage
- Test edge cases and error scenarios

## Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Explain non-obvious code decisions
- Keep comments up to date

### API Documentation
- Document all endpoints in API_DOCUMENTATION.md
- Include request/response examples
- Document error responses
- Update when adding new endpoints

### README Updates
- Keep installation instructions current
- Update feature list when adding features
- Add screenshots for UI changes
- Update dependencies list

## Review Process

### Pull Request Review
All pull requests will be reviewed for:
- Code quality and standards compliance
- Functionality and correctness
- Test coverage
- Documentation completeness
- Performance implications
- Security considerations

### Feedback
- Address review comments promptly
- Ask questions if feedback is unclear
- Make requested changes in new commits
- Update PR description if scope changes

## Release Process

### Version Numbering
We follow Semantic Versioning (SemVer):
- MAJOR version for incompatible API changes
- MINOR version for new functionality
- PATCH version for bug fixes

### Release Checklist
- All tests passing
- Documentation updated
- CHANGELOG.md updated
- Version number bumped
- Git tag created
- Release notes written

## Getting Help

### Resources
- README.md - Project overview and setup
- API_DOCUMENTATION.md - API reference
- IDEA.md - Project concept and architecture
- GitHub Issues - Bug reports and discussions

### Communication
- Create GitHub issues for bugs and features
- Use pull request comments for code discussions
- Be respectful and constructive in all interactions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions

If you have questions about contributing, please create an issue with the "question" label.

Thank you for contributing to Task Management System!