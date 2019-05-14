import React from "react";
import { act } from "react-dom/test-utils";

import { mount, setInputFieldValue } from "enzymeHelpers";

import ResetPassword from "./ResetPasswordForm";

describe("ResetPasswordForm", () => {
  const resetPassword = jest.fn(() => Promise.resolve());
  let component;

  beforeEach(() => {
    component = mount(<ResetPassword resetPassword={resetPassword} />);
  });

  it("does not trigger resetPassword when email is not provided", () => {
    act(() => {
      setInputFieldValue(component, "email", "");
      component.find("button[type='submit']").simulate("submit");
    });

    expect(resetPassword).not.toBeCalled();
  });

  it("triggers resetPassword when email is provided", () => {
    act(() => {
      setInputFieldValue(component, "email", "test@example.com");
      component.find("button[type='submit']").simulate("submit");
    });

    expect(resetPassword).toBeCalledWith({
      email: "test@example.com"
    });
  });

  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
