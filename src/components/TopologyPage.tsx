import * as React from 'react';
import { NamespaceBar, useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';

const TopologyPage: React.FC = () => {
    const [ns] = useActiveNamespace();
    console.log('ns: ', ns);

    return (
        <>
            <NamespaceBar />
            <div>hello wurld</div>
        </>
    );
};

export default TopologyPage;
