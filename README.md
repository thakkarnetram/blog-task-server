# Environment Setup

## Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (preferred version: 18.14.0)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/blog-task-server
cd blog-task-server
```

### Install Dependencies

```npm install```

### Environment Variables
- Create a .env file with the following content 

```
ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
SECRET_KEY=
PORT=
```

### Scripts
Start the Application

``` bash
npm start
```