# use-offline-captcha
This is React captcha hook for offline application.   

**This hook does not communicate with the server. Only generate and validate code through only Client. If security is critical, DO NOT USE THIS LIBRARY.**
> 

[![NPM](https://img.shields.io/npm/v/use-offline-captcha.svg)](https://www.npmjs.com/package/use-offline-captcha) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-offline-captcha
```

## Preview
[Demo](https://tofutree23.github.io/use-offline-captcha/)

## Usage
```tsx
import { useEffect, useState, useRef } from 'react'
import useCaptcha from 'use-offline-captcha'

export default function App() {
    const captchaRef = useRef()
    const [value, setValue] = useState()
    const userOpt = {
        type: 'mixed', // "mixed"(default) | "numeric" | "alpha" 
        length: 5, // 4 to 8 number. default is 5
        sensitive: false, // Case sensitivity. default is false
        width: 200, // Canvas width. default is 200
        height: 50, // Canvas height. default is 50
        fontColor: '#000',
        background: 'rgba(255, 255, 255, .2)'
    }
    const { gen, validate } = useCaptcha(captchaRef, userOpt)

    useEffect(() => {
      if (gen) gen()
    }, [gen])

    const handleValidate = () => {
        const isValid = validate(value)
    }

    const handleRefresh = () => gen()

    return (
        <>
            <div ref={captchaRef} />
            <input onChange={(e) => setValue(e.target.value)} value={value} />
            <button onClick={handleValidate}>Validate</button>
            <button onClick={handleRefresh}>Refresh</button>
        </>
  );
}
```

## Options
| Key | Description | Value |
|--|--|--|
| *type | 'numeric' only comes with numbers and 'alpha' only with alphabets. 'mixed' comes in a mixed form, but it cannot be guaranteed that only mixed forms come out. default is 'mixed' | 'mixed', 'numeric', 'alpha' |
| length | Set maximum length of captcha. default is 5 | 4 - 8 |
| sensitive | Set case sensitivity. default is false | true or false |
| width | Set captcha canvas width. default is 200 | |
| height | Set captcha canvas height. default is 50 | |
| fontColor | Set captcha canvas font color. default is #000 | |
| background | Set captcha canvas background color. default is rgba(255, 255, 255, .2) | |

## License

MIT © [tofutree23](https://github.com/tofutree23)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
