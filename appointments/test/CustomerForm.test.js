import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('CustomerForm', () => {
  let render, container;
  const form = id => container.querySelector(`form[id="${id}"]`);
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);
  const field = name => form('customer').elements[name];

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, labelText) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(labelText);
    });

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  describe('first name field', () => {

    itRendersAsATextBox('firstName');

    itIncludesTheExistingValue('firstName');

    itRendersALabel('firstName', 'First name');

    itAssignsAnIdThatMatchesTheLabelId('firstName');

    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) =>
            expect(firstName).toEqual('Ashley')
          }
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

    it('saves value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) =>
            expect(firstName).toEqual('Jamie')
          }
        />
      );
      await ReactTestUtils.Simulate.change(field('firstName'), {
        target: { value: 'Jamie' }
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  });
});