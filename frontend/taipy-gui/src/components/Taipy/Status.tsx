/*
 * Copyright 2021-2024 Avaiga Private Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { MouseEvent, ReactNode, useMemo } from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import { getInitials } from "../../utils";
import { TaipyBaseProps } from "./utils";
import { useClassNames } from "../../utils/hooks";

export interface StatusType {
    status: string;
    message: string;
}

interface StatusProps extends TaipyBaseProps {
    value: StatusType;
    onClose?: (evt: MouseEvent) => void;
    icon?: ReactNode;
}

const status2Color = (status: string): "error" | "info" | "success" | "warning" => {
    status = (status || "").toLowerCase();
    status = status.length == 0 ? " " : status.charAt(0);
    switch (status) {
        case "s":
            return "success";
        case "w":
            return "warning";
        case "e":
            return "error";
    }
    return "info";
};

// Function to get the appropriate icon based on the status
const getStatusIcon = (status: string) => {
    const color = status2Color(status);
    const iconProps = { 
        sx: { fontSize: 20, color: `${color}.main` } // Customize icon size and color
    };

    switch (status2Color(status)) {
        case "success":
            return <CheckCircleIcon {...iconProps} />;
        case "warning":
            return <WarningIcon {...iconProps} />;
        case "error":
            return <ErrorIcon {...iconProps} />;
        default:
            return <InfoIcon {...iconProps} />;
    }
};

const chipSx = { alignSelf: "flex-start" };

const Status = (props: StatusProps) => {
    const { value, id } = props;

    const className = useClassNames(props.libClassName, props.dynamicClassName, props.className);

    const chipProps = useMemo(() => {
        const cp: Record<string, unknown> = {};
        const statusColor = status2Color(value.status);
        cp.color = statusColor;
        cp.avatar = (
            <Avatar 
                sx={{ 
                    bgcolor: "transparent",
                    color: `${statusColor}.main`
                }}
            >
                {getStatusIcon(value.status)}
            </Avatar>
        );
        if (props.onClose) {
            cp.onDelete = props.onClose;
        }
        if (props.icon) {
            cp.deleteIcon = props.icon;
        }
        return cp;
    }, [value.status, props.onClose, props.icon]);

    return <Chip id={id} variant="outlined" {...chipProps} label={value.message} sx={chipSx} className={className} />;
};

export default Status;
