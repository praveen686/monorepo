// Copyright (c) Mito

import React from 'react';
import MitoAPI from '../../../api';
import { GraphType } from './GraphSidebar';
import DropdownButton from '../../elements/DropdownButton';
import Row from '../../spacing/Row';
import Col from '../../spacing/Col';

import '../../../../css/taskpanes/Graph/AxisSection.css'
import { ColumnID, ColumnIDsMap } from '../../../types';
import DropdownItem from '../../elements/DropdownItem';
import { getDisplayColumnHeader } from '../../../utils/columnHeaders';
import SelectAndXIconCard from '../../elements/SelectAndXIconCard';


export enum GraphAxisType {
    X_AXIS = 'X axis',
    Y_AXIS = 'Y axis'
}

/*
    The Axis Section contains all of the fields needed to manipulate the selected 
    column headers for each axis of the graph. 
*/
const AxisSection = (props: {
    columnIDsMap: ColumnIDsMap;
    graphType: GraphType;
    graphAxis: GraphAxisType;
    selectedColumnIDs: ColumnID[];
    otherAxisSelectedColumnIDs: ColumnID[];
    updateAxisData: (graphAxis: GraphAxisType, index: number, columnID?: ColumnID) => void;
    mitoAPI: MitoAPI;
}): JSX.Element => {

    // Filter the column headers that the user can select to only the columns that are the correct type for the graph
    const selectableColumnIDs: ColumnID[] = Object.keys(props.columnIDsMap);

    // Create Large Selects and delete buttons for each of the columns that have already been selected
    const selectedColumnHeaderSelects = props.selectedColumnIDs.map((columnID, i) => {
        return ((
            <SelectAndXIconCard 
                key={i}
                columnID={columnID}
                columnIDsMap={props.columnIDsMap}
                onChange={(columnID: string) => {
                    props.updateAxisData(
                        props.graphAxis,
                        i,
                        columnID
                    )
                }}
                onDelete={() => props.updateAxisData(props.graphAxis, i)}
                selectableColumnIDs={selectableColumnIDs}
            />
        ))
    })

    // Calculate if the axis should be disabled for any of the following three reasons. 
    const numSelectedColumns = props.selectedColumnIDs.length
    const numOtherAxisSelectedColumns = props.otherAxisSelectedColumnIDs.length

    /* 3. If there are already four series being graphed, then don't let the user add another series */
    const disabledDueToMaxSeriesReachedBool = numSelectedColumns + numOtherAxisSelectedColumns >= 10

    return (
        <div>
            <Row 
                justify='space-between' 
                align='center'
                title={`Select columns to graph on the ${props.graphAxis}.`}
            >
                <Col>
                    <div className='text-header-3'>
                        {props.graphAxis}
                    </div>
                </Col>
                <Col>
                    <DropdownButton
                        text='+ Add'
                        width='small'
                        disabled={disabledDueToMaxSeriesReachedBool}
                        searchable
                    >
                        {selectableColumnIDs.map(columnID => {
                            const columnHeader = props.columnIDsMap[columnID];
                            return (
                                <DropdownItem
                                    key={columnID}
                                    title={getDisplayColumnHeader(columnHeader)}
                                    onClick={() => {
                                        props.updateAxisData(
                                            props.graphAxis,
                                            props.selectedColumnIDs.length,
                                            columnID
                                        )
                                    }}
                                />
                            )
                        })}
                    </DropdownButton>
                </Col>
            </Row>
            {disabledDueToMaxSeriesReachedBool &&
                <div className='text-subtext-1 text-align-left'>
                    You can only graph ten series at once.
                </div>
            }
            {selectedColumnHeaderSelects}
        </div>
    )
};

export default AxisSection;