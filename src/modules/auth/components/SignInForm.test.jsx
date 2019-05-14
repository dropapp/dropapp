import React from "react";
import { act } from "react-dom/test-utils";

import { mount, setInputFieldValue } from "enzymeHelpers";

import SignInFormUnconnected from "./SignInForm";

describe("SignInForm", () => {
  let component;
  const userSignIn = jest.fn(() => {});
  beforeEach(() => {
    component = mount(<SignInFormUnconnected userSignIn={userSignIn} />);
  });
  it("does not trigger submission when email is not provided", () => {
    act(() => {
      setInputFieldValue(component, "email", "");
      setInputFieldValue(component, "password", "password");
      component.find("button[type='submit']").simulate("submit");
    });

    expect(userSignIn).not.toBeCalled();
  });
  it("does not trigger submission when password is not provided", () => {
    act(() => {
      setInputFieldValue(component, "email", "test@example.com");
      setInputFieldValue(component, "password", "");
      component.find("button[type='submit']").simulate("submit");
    });

    expect(userSignIn).not.toBeCalled();
  });
  it("signs in user when form is submitted", () => {
    act(() => {
      setInputFieldValue(component, "email", "test@example.com");
      setInputFieldValue(component, "password", "password");
      component.find("button[type='submit']").simulate("submit");
    });

    expect(userSignIn).toBeCalledWith({
      email: "test@example.com",
      password: "password"
    });
  });
});
