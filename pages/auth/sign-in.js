import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import { React, useState } from "react";
import {} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import {
  Alert,
  TextInput,
  ActionIcon,
  Stack,
  Button,
  PasswordInput,
  Modal,
  Group,
  Image,
  Center,
} from "@mantine/core";
import { IconUser, IconX, IconLock, IconHelp } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import Notifications from "../../components/Notifications";

export default function SignIn() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.replace("/");
      return;
    }
    Notifications.error("Credenciales Incorrectas");
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Iniciar Sesion - Mantenimiento</title>
        </Head>
        <form className={styles.form} onSubmit={onSubmit}>
          <Center className={styles.center}>
            <div className={styles.loginContainer}>
              <Group spacing="xs">
                <div className={styles.form}>
                  <div className={styles.helpIcon}>
                    <ActionIcon color="blue">
                      <IconHelp size={25} />
                    </ActionIcon>
                  </div>

                  <Stack
                    className={styles.stack}
                    align="center"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[8]
                          : theme.colors.gray[0],
                      height: 330,
                      width: 400,
                    })}
                  >
                    <Image
                      pt={50}
                      width={180}
                      src="/assets/img/logos/dialight_logo.png"
                    ></Image>
                    <div className={styles.text}>
                      <h2>Iniciar Sesion</h2>
                      <p>
                        Consulta informacion acerca del mantenimiento a equipo
                        de computo
                      </p>
                    </div>

                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      className={styles.inputs}
                      label="Correo electronico"
                      placeholder="ejemplo@gmail.com"
                      icon={<IconUser size={14} />}
                      description="Ingrese su correo electronico"
                    />
                    <PasswordInput
                      id="password"
                      name="password"
                      type="password"
                      className={styles.inputs}
                      placeholder=""
                      label="Contraseña"
                      description="Ingrese su contraseña"
                      withAsterisk
                      icon={<IconLock size={16} />}
                    />
                    <Button
                      type="submit"
                      className={styles.login__button}
                      radius="md"
                    >
                      Iniciar Sesion
                    </Button>

                    <a
                      className={styles.recover}
                      href="https://ui.mantine.dev/component/server-error"
                    >
                      Recuperar Contraseña
                    </a>
                  </Stack>
                </div>
              </Group>
            </div>
          </Center>
        </form>
      </div>
    </>
  );
}
