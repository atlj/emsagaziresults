import cn from "classnames";

export const Container = ({ children, className }) => {
    return (
        <div className={cn("min-h-screen flex flex-col", className)}>
            {children}
        </div>
    );
};
