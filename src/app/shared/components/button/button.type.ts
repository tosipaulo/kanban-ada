export type ButtonType = Outline | Default;

export type ButtonIcon = 'success' | 'sum-icon-light' | 'sum-icon-orange';

type Outline = {
    type: 'outline';
    text: string;
    color: 'green' | 'orange' | 'white';
    icon?: ButtonIcon;
};

type Default = {
    type: 'default';
    text: string;
    icon?: ButtonIcon;
};