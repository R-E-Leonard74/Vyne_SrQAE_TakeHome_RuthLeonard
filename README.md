# Test Project Structure

This project now includes:

- A simple Page Object Model (POM) for the Playwright homepage in src/pageObjects/PlaywrightHomePage.ts
- A JSONPlaceholder API client wrapper in src/api/jsonPlaceholderClient.ts
- Example tests in tests/pom.spec.ts

Run tests with:

```bash
npx playwright test


Steps for initial setup  
(1) Used git to create a local directory: 
    - mkdir Vyne_SrQAE_TakeHome_RuthLeonard
    - cd Vyne_SrQAE_TakeHome_RuthLeonard
    - git init
(2) Created Repo in GitHub
(3) Connected local repo with GitHub repo: 
   - git remote add origin https://github.com/R-E-Leonard74/Vyne_SrQAE_TakeHome_RuthLeonard.git
   - git branch -M main 
(4) Created a new workspace in VS Code by opening the local repo Vyne_SrQAE_TakeHome_RuthLeonard
(5) In the VS Code window, typed CTRL+SHIFT+P and selected Test: Install Playwright
    - select the desired browsers
(6) Created GitHub Actions workflow file under ..\Vyne_SrQAE_TakeHome_RuthLeonard\.github\workflows


Problems encountered with AI Generated tests: 
    - Tried to run the AI generated test for the first time and discovered the project was not enabled. Selected the VS Code prompt to enable. 
    - WebApp.spec.ts test run failed at import line "import { LoginPage } from '../pages/LoginPage';" for Error: Cannot find module '../pages/LoginPage'. The other page obects CartPage and InventoryPage also failed for the same.  This was due to the wrong path after from.  I changed it to: use '../src/PageObjects/' instead.
    - ApiPosts.spec.ts test run failed at "import { JSONPlaceholderClient } from '../clients/JSONPlaceholderClient'". The AI generated code does not have the correct path, it was missing /src.

Added Tests: 
    WebApp.spec.ts: 
    - Login with invalid password for standard user
    - Log out user
    - Remove item from cart

    ApiPosts.spec.ts:
    - Attempt get post with invalid id
    - Create a new postt with a new user id
    - Patch an existing test 
    - I added console output commands to each test to be able to see the response.

Prompts are saved in the PROMPTS.md

Evaluation: 
    The framework was pretty easy to use and run tests.  Playwright makes it relatively straight forward to create a robust framework  Using AI to help create the tests and some of the infrastructure makes it infinitely less stressful to build a new framework. It also provides example test from which to build further from. 



```
