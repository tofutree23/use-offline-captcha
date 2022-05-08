# Use offline captcha
This is React captcha hook for offline application.   

**This hook does not communicate with the server. Only generate and validate code through Client logic. If security is critical, use is not recommended.**

# Usage
```tsx
import { useEffect, useState, useRef } from 'react'
import useCaptcha from 'use-offline-captcha'

export default function App() {
    const captchaRef = useRef()
    const [value, setValue] = useState()
    const userOpt = {
        type: 'mixed', // "mixed"(default) | "numeric" | "alpha" 
        length: 5, // 1 to 8 number. default is 5
        sensitive: false // Case sensitivity. default is false
    }
    const { gen, validate } = useCaptcha(captchaRef, userOpt)

    useEffect(() => {
        gen()
    }, [])

    const handleValidate = () => {
        const isValid = validate(value)
    }

    return (
        <>
            <div ref={captchaRef} />
            <input onChange={(e) => setValue(e.target.value)} value={value} />
            <button onClick={handleValidate}>Validate</button>
        </>
  );
}
```

# Options
| Key | Description | Value |
|--|--|--|
| type | 'numeric' only comes with numbers and 'alpha' only with alphabets. 'mixed' comes in a mixed form, but it cannot be guaranteed that only mixed forms come out. default is 'mixed' | 'mixed', 'numeric', 'alpha' |
| length | Set maximum length of captcha. default is 5 | 1 - 8 |
| sensitive | Set case sensitivity. default is false | true or false |