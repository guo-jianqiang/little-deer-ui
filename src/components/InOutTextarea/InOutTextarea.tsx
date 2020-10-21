import React, { useState } from 'react';
import { InOutTextarea, InOptions, OutOptions } from 'react-in-out-textarea';

export const ExampleComponent = () => {
    const [inValue, setInValue] = useState<string>('');
    const [outValue, setOutValue] = useState<string>('');
    const [inOptions, setInOptions] = useState<InOptions>([
        {
            name: 'English',
            active: true,
        },
        {
            name: 'German',
            active: false,
        },
    ]);
    const [outOptions, setOutOptions] = useState<OutOptions>([
        {
            name: 'Chinese',
            active: true,
            activeClicked: false,
        },
    ]);

    return (
        <InOutTextarea
            inValue={inValue}
            outValue={outValue}
            onInInput={(newValue) => {
                setInValue(newValue);
                setOutValue(newValue);
            }}
            inOptions={inOptions}
            onInOptionsUpdate={(newInOptions) => {
                setInOptions(newInOptions);
            }}
            outOptions={outOptions}
            onOutOptionsUpdate={(newOutOptions) => {
                setOutOptions(newOutOptions);
            }}
        />
    );
};
export default ExampleComponent