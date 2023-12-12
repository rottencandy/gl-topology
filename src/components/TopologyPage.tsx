import * as React from 'react';
import { NamespaceBar, useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';
import { GLCanvas } from './GLCanvas';

const TopologyPage: React.FC = () => {
    const [ns] = useActiveNamespace();
    console.log('ns: ', ns);

    return (
        <>
            <NamespaceBar />
            <GLCanvas />
        </>
    );
};

export default TopologyPage;
