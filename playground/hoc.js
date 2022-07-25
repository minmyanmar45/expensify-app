import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>
      click hree for more dtail {props.info} and
      {props.isAuthenticated ? "true" : "false"}
    </p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      <p>don't share these info</p>
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {isAuthenticated ? (
        <div>
          <p>don't share</p>
          <WrappedComponent {...props} />
        </div>
      ) : (
        <p>plz login</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="click here for more" />,
  document.getElementById("app")
);
/*ReactDOM.render(
  <AdminInfo info="click here for more detai" />,
  document.getElementById("app")
);*/
