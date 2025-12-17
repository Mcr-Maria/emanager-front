import { Button, Drawer, Form, Input, Popconfirm, Select, Table, Tag } from "antd";
import { useBuscarJogo, useCriarJogo, useDeletarJogo, useEditarJogo } from "../hooks/jogosHooks";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useContext, useState } from "react";
import { AntContext } from "../contexts/AntProvider";
import { useBuscarPlataforma } from "../hooks/plataformasHooks";

const Jogos = () => {

    const { data: jogos } = useBuscarJogo();
    const { data: plataformas, isFetched: plataformasOk } = useBuscarPlataforma();
    const { mutateAsync: criarJogo, isPending: criarPending } = useCriarJogo();
    const { mutateAsync: editarJogo, isPending: editarPending } = useEditarJogo();
    const { mutateAsync: deletarJogo } = useDeletarJogo();
    const { api } = useContext(AntContext);
    const [verCriar, setVerCriar] = useState(false);
    const [verEditar, setVerEditar] = useState(false);
    const [formEditar] = Form.useForm();
    const [formCriar] = Form.useForm();

    function criar(dados) {
        criarJogo(dados, {
            onSuccess: (response) => {
                setVerCriar(false);
                api[response.tipo]({
                    description: response.mensagem
                })
                formCriar.resetFields()
            },
            onError: (response) => {
                api[response.tipo]({
                    description: response.mensagem
                })
            }
        })

    }

    function editar(dados) {
        editarJogo(dados, {
            onSuccess: (response) => {
                setVerEditar(false);
                api[response.tipo]({
                    description: response.mensagem
                })
            },
            onError: (response) => {
                api[response.tipo]({
                    description: response.mensagem
                })
            }
        })
    }

    function deletar(id) {
        deletarJogo(id, {
            onSuccess: (response) => {
                api[response.tipo]({
                    description: response.mensagem
                })
            },
            onError: (response) => {
                api[response.tipo]({
                    description: response.mensagem
                })
            }
        })
    }

    return (
        <div className="p-15">
            <div className="flex items-center justify-between mb-4">
                <h1>Pagina de Jogos</h1>
                <Button type="primary" onClick={() => setVerCriar(true)}>Novo jogo</Button>
            </div>
            <Table
                dataSource={jogos || []}
                rowKey={"id"}
            >
                <Table.Column
                    key={"id"}
                    dataIndex={"id"}
                    title={"ID"}
                    className="w-[50px]"
                />
                <Table.Column
                    key={"nome"}
                    dataIndex={"nome"}
                    title={"Nome"}
                />
                <Table.Column
                    key={"preco_full"}
                    dataIndex={"preco_full"}
                    title={"Preço cheio"}
                />
                <Table.Column
                    key={"preco_promo"}
                    dataIndex={"preco_promo"}
                    title={"Preço promocional"}
                />
                <Table.Column
                    title={"Plataforma"}
                    render={(_, linha) => <Tag variant="solid" color={linha.plataformas.cor}>{linha.plataformas.nome}</Tag>}
                />
                <Table.Column
                    title={"Ações"}
                    className="w-[100px]"
                    render={(_, nivel) => (
                        <div className="flex gap-3">
                            <BiPencil
                                size={18}
                                onClick={() => {
                                    formEditar.setFieldsValue({
                                        id: nivel.id,
                                        nome: nivel.nome
                                    });
                                    setVerEditar(true);
                                }}
                            />
                            <Popconfirm
                                title="Aviso:"
                                description="Deseja realmente apagar?"
                                onConfirm={() => deletar(nivel.id)}
                                okText="Sim"
                                cancelText="Não"
                            >
                                <BiTrash size={18} />
                            </Popconfirm>
                        </div>
                    )}
                />
            </Table>

            <Drawer
                title={"Criar"}
                open={verCriar}
                onClose={() => setVerCriar(false)}
            >
                <Form
                    layout="vertical"
                    onFinish={criar}
                    form={formCriar}
                >
                    <Form.Item
                        label={"Nome"}
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Plataforma"}
                        name={"plataforma_id"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Select
                            placeholder="Escolha a plataforma"
                            options={(plataformas || []).map(plataforma => {
                                return {
                                    label: plataforma.nome,
                                    value: plataforma.id
                                }
                            })}
                        />
                    </Form.Item>
                    <div className="flex gap-4 *:flex-1">
                        <Form.Item
                            label={"Preço cheio"}
                            name={"preco_full"}
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={"Preço promocional"}
                            name={"preco_promo"}
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Button loading={criarPending} htmlType="submit" type="primary">Criar</Button>
                </Form>
            </Drawer>

            <Drawer
                title={"Editar"}
                open={verEditar}
                onClose={() => setVerEditar(false)}
            >
                <Form
                    layout="vertical"
                    onFinish={editar}
                    form={formEditar}
                >
                    <Form.Item
                        hidden
                        name={"id"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Nome"}
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Button loading={editarPending} htmlType="submit" type="primary">Editar</Button>
                </Form>
            </Drawer>
        </div>
    );
}

export default Jogos;