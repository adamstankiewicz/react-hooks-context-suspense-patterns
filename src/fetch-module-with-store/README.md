# Fetch Module with Store

A potentially publishable NPM package that supports creating component modules that does the following:

1. Share data across all components in the module;
2. Let all components in the module update the shared data.
3. Prevent rendering of the module's component tree until all data is successfully returned. A fallback component (e.g., loading spinner) can be rendered if data is still fetching.

## What's the problem?

* I want to share data across all of the components in a folder in a module-specific store. For example, if I am trying to render a page for a ``Course`` (i.e., module), I'd like to have all the data that ``Course`` relies on in a store that can be read from or updated at any point in the component tree within the module.
* I want to let any of the components in a folder update this shared data as needed.
* I want to prevent the rendering of the component tree until all external data dependencies (e.g., API responses) are resolved.
* I don't want to have to manage loading states manually throughout the subcomponent tree. More specifically, I'd like my subcomponents to feel more synchronous and declarative. For example, rather than needing to ``return null;`` to prevent rendering a component when its data is missing (e.g., still fetching), it would be great to just try to access the data, and if it doesn't exist, just render the fallback component for the module.

## ``fetch-module-with-store``

Example implementation using ``fetch-module-with-store``:

**CoursePage.jsx**

```javascript
import React from 'react';

import { makeFetchModuleStore, makeServiceResource } from '../fetch-module-with-store';
import Course from './Course';

import reducer, { initialState } from './data/reducer';
import { fetchCourseDetails, fetchUserEnrollments } from './data/service';

const resource = makeServiceResource({
  courseDetails: fetchCourseDetails,
  userEnrollments: fetchUserEnrollments,
});

export const FetchModuleStore = makeFetchModuleStore({
  reducer,
  initialState,
  resource,
});

export default function CoursePage() {
  return (
    <FetchModuleStore.Component fallback={<h1>loading course...</h1>}>
      <Course />
    </FetchModuleStore.Component>
  );
}
```

**Course.jsx**

```javascript
import React, { useContext } from 'react';

import { FetchModuleStore } from './CoursePage';

export default function Course() {
  const { courseDetails } = useContext(FetchModuleStore.Context);

  return (
    <h1>{courseDetails.title}</h1>
  );
}
```
