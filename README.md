
# UI Components Library

A set of reusable React components for building interfaces quickly.

---

## Installation

```bash
npm install 
npm run storybook
```

---

## Components

### 1. Input

A versatile input component with support for:

- Text, number, and password inputs  
- Password show/hide toggle  
- Clearable input value  
- Integration with `react-hook-form` for validation  

#### Props

| Name           | Type                                         | Default  | Description |
|----------------|---------------------------------------------|----------|-------------|
| `type`         | `'text' \| 'password' \| 'number'`         | -        | Input type |
| `label`        | `string`                                    | -        | Input label |
| `labelHidden`  | `boolean`                                   | `false`  | Hide the label text |
| `placeholder`  | `string`                                    | -        | Placeholder text |
| `cleareable`   | `boolean`                                   | `false`  | Show clear button |
| `onClear`      | `() => void`                                | -        | Callback when input is cleared |
| `errors`       | `FieldErrors<T>`                            | -        | Validation errors from `react-hook-form` |
| `inputControl` | `Control<T>`                                | -        | `react-hook-form` control |
| `name`         | `FieldPath<T>`                              | -        | Field name in form |
| `autocomplete` | `HTMLInputElement['autocomplete']`          | `'off'`  | Input autocomplete attribute |

#### Example

```tsx
<Input
  type="password"
  label="Password"
  name="password"
  cleareable
  errors={errors}
  inputControl={control}
  placeholder="Enter your password"
  onClear={() => console.log('cleared')}
/>
```
![Input Component](https://ibb.co/gLNprHbB)
![Input Component](https://ibb.co/dw4C6L1S)
---

### 2. Notifications

A context-based notification system with support for:

- Success and error notifications  
- Auto-expiration after a set duration  
- Optional closable notifications  

#### Usage

Wrap your app with the provider:

```tsx
import { NotificationProvider, useNotificationContext } from '@my-org/ui-components';

function App() {
  return (
    <NotificationProvider>
      <YourComponents />
    </NotificationProvider>
  );
}
```

Trigger a notification anywhere in the app:

```tsx
const { addNotification } = useNotificationContext();

addNotification({
  type: 'success',
  message: 'Data saved successfully!',
  duration: 3000,
  isClosable: true,
});
```

#### Notification Options

| Name         | Type                        | Description |
|--------------|-----------------------------|-------------|
| `type`       | `'success' \| 'error'`      | Notification type |
| `message`    | `string`                     | Text message |
| `duration`   | `number`                     | How long notification stays (ms) |
| `isClosable` | `boolean`                    | Show close button |
| `onClose`    | `() => void`                 | Callback when closed |

![Notification Component](https://ibb.co/qY4hQx0P)
![Notification Component](https://ibb.co/TDyNvTgn)
---

### 3. Sidebar

A collapsible sidebar component with nested accordion menus.

#### Props

| Name    | Type                        | Default | Description |
|---------|-----------------------------|---------|-------------|
| `isShown` | `boolean`                  | -       | Show or hide the sidebar |
| `menu`   | `AccordionProperties['data']` | -    | Menu data for the accordion |

#### Example

```tsx
<Sidebar
  isShown={true}
  menu={[
    { heading: 'Dashboard', content: '/dashboard' },
    { heading: 'Settings', content: [
        { heading: 'Profile', content: '/settings/profile' },
        { heading: 'Account', content: '/settings/account' }
      ]
    }
  ]}
/>
```
![Sidebar Component](https://ibb.co/TBF2WVyc)
![Sidebar Component](https://ibb.co/fdkp8GPT)
---
![Storybook](https://ibb.co/7J21MN5d)
---

## Features

- Fully typed with TypeScript  
- Works seamlessly with forms (`Input`)  
- Flexible notification system (`Notifications`)  
- Collapsible sidebar with nested menus (`Sidebar`)  