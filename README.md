# Code Quiz Challenge: Platform Overview and Vision

Our primary target audience consists of professionals and students who want to advance their software skills. Their greatest need is access to high-quality coding challenges that go beyond theory and allow them to apply real-world problem-solving. That's where our platform comes in: we offer a comprehensive assessment experience with both multiple-choice questions and open-ended "write-code" exercises across various topics. Rather than wading through abstract explanations, our users can quickly test themselves and immediately identify their areas of weakness.

## Future Enhancements

In future phases, we plan to deepen our support by adding more advanced question sets, adaptive testing mechanisms, and customizable study cards. This way, learners at every level—from beginners to experts—can progress at their own pace with a personalized, goal-driven learning experience.

# Getting Started: How to Use the Platform

When you first arrive, you'll see a Login screen; if you don't have an account yet, click Register to sign up, then log in with your email and password. Once logged in, visit the About page to learn about the project's purpose and the technologies used (HTML5, CSS3, JavaScript, jQuery UI, etc.). Next, go to Quiz, start the test, and answer multiple-choice and coding questions within the allotted time. When you finish, click View Score to see your points, completion time, and other users' latest results—then you can retake the quiz if you like. From the Contact page you can send a message and review all incoming messages under Messages, and when you're done, click Logout to end your session.

## Project Features

- User registration and login
- Multiple-choice questions
- Coding questions with live code execution
- Scoreboard and statistics
- Theme switching (light/cream)
- Contact form
- Admin message system

# Meeting the Specifications

- A fully responsive website was developed including a home page (index.html) with navigation, content, and images.

- A consistent and shared navigation bar was implemented across all pages using classes and external CSS.

- At least three pages are content-rich: about.html, quiz.html, contact.html, score.html, etc.

## jQuery Plugins and jQuery-UI Widgets Used

### jQuery Plugins:

1. **jQuery Validation Plugin (v1.16.0)**
   - Usage: Input validation in the contact form
   - File: `https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js`
   - Implementation: Form validation rules and custom validation methods (phoneUS) in the `contact.html` page

2. **jQuery DataTables (v1.13.6)**
   - Usage: Search, sorting, and pagination features in the score table
   - File: `https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js`
   - Implementation: Advanced table features for the score list in the `score.html` page

3. **jQuery Theme Switcher (Custom)**
   - Usage: Dynamic theme switching (light theme/cream theme)
   - File: `scripts/theme.js`
   - Implementation: Theme toggle button and theme preference storage with localStorage on all pages

### jQuery UI Widgets:

1. **jQuery UI Dialog**
   - Usage: Quiz results and user notifications
   - File: `https://code.jquery.com/ui/1.13.2/jquery-ui.js`
   - Implementation: Displaying quiz results and user feedback in the `quiz.html` page

2. **jQuery UI Datepicker**
   - Usage: Date selection in the contact form
   - File: `https://code.jquery.com/ui/1.13.2/jquery-ui.js`
   - Implementation: Expected response date selection in the `contact.html` page


# AJAX Requests:

- Local: Questions are loaded dynamically from data/questions.json using jQuery’s getJSON().

- External: A user list is fetched from https://jsonplaceholder.typicode.com/users and displayed in about.html.

# Code is modular and well-organized:

- HTML in pages/, CSS in styles/, JS in scripts/, and JSON data in data/.



## Running Requirements

1. Run the project on a web server or local server
2. Open the `index.html` file
3. You will be automatically redirected to the login page on first access
4. Register or log in (any username/password is accepted)

## Browser Requirements

- Modern web browsers (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled
- localStorage support required

## Working URL

- Working version of the project: 
https://macitf.github.io/ResponsiveProje/

## Project Team

- Efe Bekir Altop
- Furkan Macit 