import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import UserForm from './UserForm';
import UserService from "./services/user"



describe('UserForm component', () => {
  test('should render all form inputs', () => {
    render(<UserForm />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
  });

  test('should submit the form with correct data', async () => {
    const createMock = jest.spyOn(UserService, 'create').mockResolvedValue({});

    render(<UserForm />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const phoneNumberInput = screen.getByLabelText('Phone Number');
    const addressInput = screen.getByLabelText('Address');
    const ageInput = screen.getByLabelText('Age');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    await act(async () => {
      fireEvent.select(ageInput, { target: { selectedIndex: 2 } });
      
    });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(createMock).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        age: 18,
      });
    });
  
    createMock.mockRestore();

    // You can also add more assertions to verify that the form resets after submission
  });
  test("validateForm returns true when all fields are valid", () => {
    const { getByLabelText, queryByText } = render(<UserForm />);
    fireEvent.change(getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.change(getByLabelText("Address"), { target: { value: "123 Main St" } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(queryByText(/is required/)).not.toBeInTheDocument();
    expect(queryByText(/Invalid email address/)).not.toBeInTheDocument();
    expect(queryByText(/Invalid phone number/)).not.toBeInTheDocument();
    expect(queryByText(/Address is required/)).not.toBeInTheDocument();
  });

  test("validateForm returns false when required fields are missing", () => {
    const { getByLabelText, queryByText } = render(<UserForm />);
    fireEvent.change(getByLabelText("First Name"), { target: { value: "" } });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "" } });
    fireEvent.change(getByLabelText("Email"), { target: { value: "" } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "" } });
    fireEvent.change(getByLabelText("Address"), { target: { value: "" } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(queryByText(/First name is required/)).toBeInTheDocument();
    expect(queryByText(/Last name is required/)).toBeInTheDocument();
    expect(queryByText(/Invalid email address/)).toBeInTheDocument();
    expect(queryByText(/Invalid phone number/)).toBeInTheDocument();
    expect(queryByText(/Address is required/)).toBeInTheDocument();
  });

  test("validateForm returns false when email or phone number is invalid", async () => {
    const { getByLabelText, queryByText, getByText } = render(<UserForm />);
    fireEvent.change(getByLabelText("Email"), { target: { value: "invalid email" } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    await waitFor(() => {
      expect(getByText("Invalid email address")).toBeInTheDocument();
      expect(queryByText(/Invalid phone number/)).toBeInTheDocument();
    });
  });

  test('should submit form with valid data and reset form after submitting', async () => {
    const createMock = jest.spyOn(UserService, 'create').mockImplementation(() => Promise.resolve({}));
    render(<UserForm />);

    // fill out form
    userEvent.type(screen.getByLabelText('First Name'), 'John');
    userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    userEvent.type(screen.getByLabelText('Email'), 'johndoe@example.com');
    userEvent.type(screen.getByLabelText('Phone Number'), '1234567890');
    userEvent.type(screen.getByLabelText('Address'), '123 Main St');
    await act(async () => {
      fireEvent.select(screen.getByLabelText('Age'), { target: { selectedIndex: 2 } });
    });
    // submit form
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // assert form data is reset
    await waitFor(() => {
      expect(screen.getByLabelText('First Name')).toHaveValue('');
      expect(screen.getByLabelText('Last Name')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('Phone Number')).toHaveValue('');
      expect(screen.getByLabelText('Address')).toHaveValue('');
    });
    // cleanup
    createMock.mockRestore();
  });

  // You can also write more tests to cover edge cases and error handling
});
