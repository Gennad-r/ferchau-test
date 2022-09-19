# Applicant task - Angular - Create a radio group module

The radio group module should export two standalone components:

- A radio button component
- A radio group component

## Radio button component

Should be a radio button with custom CSS styles. It should work similar to the native browser radio buttons for the selection model.

Acceptance criteria:

- Radio button component must be a standalone component
- Radio button component must have a value input
- Radio button component can be disabled
- Radio button component can have a label
- Radio button component can only be used inside a radio group component

## Radio Group component

Should be a custom form control to work with template driven and reactive forms.

Acceptance criteria:

- Only one radio button can be selected at a time
- Radio group component only allows radio button components as content
- Radio group component can be disabled
- Radio group component must work as custom form control with template driven forms
- Radio group component must work as custom form control with reactive forms

## Hints:

- The component UI design is up to you (a basic design is enough)
- Don't use third party component libraries
- Unit tests are mandatory
- A11y can be ignored
