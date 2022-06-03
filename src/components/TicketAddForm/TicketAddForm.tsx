import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Img from "react-cool-img";

import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useTicket from "hooks/ticket/useTicket";

import "components/TicketAddForm/TicketAddForm.scss";

const TicketAddForm = (props) => {
    // Props
    const {
        ticketId,
        ticketNumber,
        activeClient
    } = props;
    // Hooks
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { updateTicket } = useTicket();
    // Handler methods
    const onSubmit = async (data) => {
        data.id = ticketId;
        let response = await updateTicket(data);
        if(response !== null && response !== undefined && response !== '') {
            navigate("/");
        }
    }
    // Rendering
    return(
        <>
            <form className="ticket-add-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="ticket-add-form-header">
                    <Img 
                        className="ticket-add-form-header-brand"
                        src="/assets/icons/icon-512x512.png"
                        alt="Logo"
                        debounce={1000}
                        cache={true}
                        lazy={true} 
                    />
                </div>
                <div className="ticket-add-form-number-container">
                    <div className="ticket-add-form-number-wrapper">
                        {ticketNumber}
                    </div>
                </div>
                <Grid 
                    container
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <div 
                            className="ticket-add-form-switch-container"
                        >   
                            <FormControlLabel 
                                control={
                                    <Switch 
                                        defaultChecked
                                        {...register("active", { 
                                            required: true
                                        })}
                                    />
                                } 
                                label="Activar" 
                            />
                        </div>
                    </Grid>
                    <Grid 
                        item 
                        xs={12} sm={2}
                    >
                        <FormControl 
                            variant="standard"
                            fullWidth
                        >
                            <InputLabel 
                                id="typeid"
                            >
                                Id
                            </InputLabel>
                            <Select
                                labelId="typeid"
                                label="typeid"
                                defaultValue={activeClient.typeid}
                                {...register("typeid", { 
                                    required: true
                                })}
                            >
                                <MenuItem value="V">V</MenuItem>
                                <MenuItem value="E">E</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid 
                        item 
                        xs={12} sm={5}
                    >
                        <TextField 
                            label="Identificador" 
                            variant="standard"
                            defaultValue={activeClient.numid}
                            fullWidth
                            {...register("numid", { 
                                required: true
                            })}
                        />    
                    </Grid>
                    <Grid 
                        item 
                        xs={12} sm={5}
                    >
                        <FormControl 
                            variant="standard"
                            fullWidth
                        >
                            <InputLabel 
                                id="gender"
                            >
                                Genero
                            </InputLabel>
                            <Select
                                labelId="gender"
                                label="gender"
                                defaultValue={activeClient.gender}
                                {...register("gender", { 
                                    required: true
                                })}
                            >
                                <MenuItem value="hombre">Hombre</MenuItem>
                                <MenuItem value="mujer">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid 
                        item 
                        xs={12} sm={6}
                    >
                        <TextField 
                            label="Nombre" 
                            variant="standard" 
                            defaultValue={activeClient.firstname}
                            fullWidth
                            {...register("firstname", { 
                                required: true
                            })}
                        />    
                    </Grid>
                    <Grid 
                        item 
                        xs={12} sm={6}
                    >
                        <TextField 
                            label="Apellido" 
                            variant="standard" 
                            defaultValue={activeClient.lastname}
                            fullWidth
                            {...register("lastname", { 
                                required: true
                            })}
                        />    
                    </Grid> 
                    <Grid 
                        item 
                        xs={12} sm={6}
                    >
                        <TextField 
                            label="Email" 
                            variant="standard" 
                            defaultValue={activeClient.email}
                            fullWidth
                            {...register("email", { 
                                required: true
                            })}
                        />    
                    </Grid> 
                    <Grid 
                        item 
                        xs={12} sm={6}
                    >
                        <FormControl 
                            variant="standard"
                            fullWidth
                        >
                            <InputLabel 
                                id="status"
                            >
                                Status
                            </InputLabel>
                            <Select
                                labelId="status"
                                label="status"
                                defaultValue={activeClient.status}
                                {...register("status", { 
                                    required: true
                                })}
                            >
                                <MenuItem value="available">Disponible</MenuItem>
                                <MenuItem value="lock">Apartado</MenuItem>
                                <MenuItem value="buyed">Vendido</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> 
                </Grid>
                <div
                    className="ticket-add-form-btn-group" 
                >
                    <Link
                        to="/"
                    >                    
                        <Button 
                            variant="contained"
                            color="error"
                            size="small"
                        >
                            Regresar
                        </Button>
                    </Link>
                    <Button 
                        type="submit"
                        variant="contained"
                        size="small"
                        style={{
                            marginLeft: '1rem',
                            background: '#b24592'
                        }}
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </>
    );
};

export default TicketAddForm;
