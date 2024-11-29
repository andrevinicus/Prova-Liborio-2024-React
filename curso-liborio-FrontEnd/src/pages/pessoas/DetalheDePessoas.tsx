import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VForm, VTextField, useVForm } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasServices";


interface IFormData {
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}


export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);
                        console.log(result);

                        formRef.current?.setData(result);
                    }
                })
        } else {
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: '',
            });
        }
    }, [formRef, id, navigate]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'nova') {
            PessoasService.create(dados)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Pessoa criada com sucesso.');
                        navigate(`/pessoas/detalhe/${result}`);
                    }
                })
                .catch(error => {
                    alert('Erro inesperado ao criar pessoa.');
                    console.error(error);
                })
                .finally(() => setIsLoading(false));
        } else {
            PessoasService.updateById(Number(id), { id: Number(id), ...dados })
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Cadastro atualizado com sucesso.');
                        navigate(`/pessoas/detalhe/${id}`);
                    }
                })
                .catch(error => {
                    alert('Erro inesperado ao atualizar cadastro.');
                    console.error(error);
                })
                .finally(() => setIsLoading(false));
        }
    };

    const handleDelete = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso.');
                        navigate('/pessoas');
                    }
                })
                .catch(error => {
                    alert('Erro inesperado ao apagar registro.');
                    console.error(error);
                });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >
            <VForm onSubmit={(handleSave)} ref={formRef} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Box margin={1} display={'flex'} flexDirection={'column'} component={Paper} variant="outlined">

                    <Grid container direction={'column'} padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item >
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}

                        <Grid item >
                            <Typography variant="h6">Geral</Typography>
                        </Grid>



                        <Grid container item direction="row">

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Nome Completo"
                                    name='nomeCompleto'
                                    onChange={e => setNome(e.target.value)}
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Email"
                                    name='email'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Cidade"
                                    name='cidadeId'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </VForm>

        </LayoutBaseDePagina>
    );
};
