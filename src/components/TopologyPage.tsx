import * as React from 'react';
import { K8sResourceCommon, NamespaceBar, useActiveNamespace, useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { GLCanvas } from './GLCanvas';
import { Bullseye, Spinner } from '@patternfly/react-core';

const TopologyPage: React.FC = () => {
    const [ns] = useActiveNamespace();
    const [pods, loaded] = useK8sWatchResource<K8sResourceCommon[]>({
        groupVersionKind: {
            version: 'v1',
            kind: 'Pod',
        },
        namespace: ns,
        isList: true,
        namespaced: true,
    });

    if (!loaded) {
        return (
            <Bullseye>
                <Spinner size="xl" aria-label="Loading resources..." />
            </Bullseye>
        );

    }

    return (
        <>
            <NamespaceBar />
            <GLCanvas res={pods} />
        </>
    );
};

export default TopologyPage;
