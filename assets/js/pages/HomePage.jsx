import React from 'react';

const HomePage = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-3">CRM application</h1>
            <p className="lead">This portfolio application mimicking a CRM software, is based on <a href="https://reactjs.org/" target="_blank">React.js</a>&nbsp;
                 for the interface you currently see, and <a href="https://api-platform.com/" target="_blank">api-platform</a>&nbsp;
                for the REST-API.
            </p>
            <hr className="my-4" />
            <p className="text-justify">Hello! I hope you're doing fine.
                I am <a href="https://github.com/daProclaima/" target="_blank">Sébastien NOBOUR</a>, the developer of this application and mainly backend developer.
            </p>
            <p className="text-justify">
                This application was developed thanks to the excellent course of <a href="https://www.linkedin.com/in/lior-chamla/" target="_blank">Lior Chamla</a>.&nbsp;
                If you are a developer willing to enhance skills on this stack, here is the <a href="https://rcl.ink/xJZsq">link to the course</a>&nbsp;
                <span className='font-weight-bold'>(ONLY available in FRENCH though!)</span>. See you soon!
            </p>
        </div>
    );
};

export default HomePage;
